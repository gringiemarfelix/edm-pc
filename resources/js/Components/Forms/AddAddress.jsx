import { useForm } from "@inertiajs/react";
import {
  Alert,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { GoogleMap, Marker } from '@react-google-maps/api';

const AddAddress = ({ addingAddress, closeModal }) => {
  const [value, setValue] = useState(null)
  const { data, setData, post, processing, errors, reset } = useForm({
    address: "",
    latitude: "",
    longitude: ""
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("address.store"), {
      onSuccess: () => {
        closeModal()

        toast.success('Address added successfully.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        })
      }
    })
  };

  useEffect(() => {
    if(value){
      geocodeByAddress(value.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => 
        setData(prev => ({
          ...prev,
          address: value.label,
          latitude: lat,
          longitude: lng,
        }))
      )
    }
  }, [value])

  useEffect(() => {
    if(!addingAddress){
      return () => {
        reset(
          'address',
          'latitude',
          'longitude'
        )
        setValue(null)
      }
    }
  }, [addingAddress])

  return (
    <Dialog open={addingAddress} handler={closeModal} size="sm">
      <form onSubmit={submit}>
        <DialogHeader>
          Add Address
        </DialogHeader>
        <DialogBody divider>
          <div className="my-6">
            {
              (data.latitude && data.longitude) &&
              <div className="shadow rounded-lg mb-3">
                <GoogleMap
                  mapContainerStyle={{
                    width: 'auto',
                    height: '400px',
                    borderRadius: 4
                  }}
                  center={{
                    lat: data.latitude,
                    lng: data.longitude,
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: data.latitude,
                      lng: data.longitude,
                    }}
                  />
                </GoogleMap>
              </div>
            }
            {
              Object.keys(errors).length > 0 &&
              <Alert
                variant="gradient"
                color="red"
                icon={
                  <InformationCircleIcon
                    strokeWidth={2}
                    className="h-6 w-6"
                  />
                }
                className="mb-3"
              >
                <Typography className="font-medium">Ensure that these details are correct:</Typography>
                <ul class="mt-2 ml-2 list-disc list-inside">
                  {errors.address && <li>{errors.address}</li>}
                  {errors.latitude && <li>{errors.latitude}</li>}
                  {errors.longitude && <li>{errors.longitude}</li>}
                </ul>
              </Alert>
            }
            <GooglePlacesAutocomplete 
              apiKey={import.meta.env.VITE_MAPS_API_KEY}
              autocompletionRequest={{
                componentRestrictions: {
                  country: 'ph'
                }
              }}
              minLengthAutocomplete={3}
              selectProps={{
                value,
                onChange: setValue
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={closeModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            variant="gradient"
            color="blue"
            disabled={processing}
          >
            Add Address
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default AddAddress
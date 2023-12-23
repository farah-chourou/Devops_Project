/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import Toastfunction from "./ToastFunction";

export const doMutation = (
  error,
  success,
  key,
  mutationFunction,
  handleClose
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(mutationFunction, {
    onSuccess: (data) => {
      Toastfunction.TaostSuccess(success);
      console.log("Data Return By Mutation ", data);
      if (handleClose) {
        handleClose();
      }
    },
    onError: (err) => {
      Toastfunction.ToastError(err?.response?.data?.message);
      console.log("Error Return By Mutation ", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(key);
    },
  });

  return { mutate, isLoading, error, success };
};

export const doMutationClient = (error, key, mutationFunction) => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);

  const { mutate, isLoading, isSuccess } = useMutation(mutationFunction, {
    onSuccess: (data) => {
      console.log("Data Return By Mutation ", data);
      setShow(true);
    },
    onError: (err) => {
      //  ToastFunction.TaostSuccess(err?.response?.data?.message);
      console.log("Error Returned By Mutation", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(key);
    },
  });

  return { mutate, isLoading, error, isSuccess, show };
};

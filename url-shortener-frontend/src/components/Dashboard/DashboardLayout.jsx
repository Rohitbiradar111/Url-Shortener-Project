import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import ShortenItem from "./ShortenItem";
import Modal from "@mui/material/Modal";
import CreateNewShorten from "./CreateNewShorten";

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  const {
    isLoading,
    isError: isUrlsError,
    data: myShortenUrls,
    refetch,
  } = useFetchMyShortUrls(token);

  const {
    isLoading: loader,
    isError: isClicksError,
    data: totalClicks,
  } = useFetchTotalClicks(token);

  useEffect(() => {
    if (isUrlsError || isClicksError) {
      navigate("/error");
    }
  }, [isUrlsError, isClicksError, navigate]);

  if (isLoading || loader) return <Loader />;

  return (
    <div className="lg:px-20 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-10">
          <div className="py-10 text-center">
            <button
              className="px-4 py-2 rounded-md bg-amber-400 hover:bg-amber-500 hover:cursor-pointer"
              onClick={() => setShortenPopUp(true)}
            >
              Create a New Short URL
            </button>
          </div>

          <div>
            {!isLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center py-6 sm:px-8 px-5 rounded-md   shadow-lg bg-gray-50">
                  <h1 className="text-slate-800 sm:text-[18px] text-[14px] font-semibold mb-1">
                    You haven't created any short link yet
                  </h1>
                  <FaLink className="text-blue-500 sm:text-xl text-sm" />
                </div>
              </div>
            ) : (
              <>
                <p className="text-slate-800 sm:text-[18px] text-[14px] font-semibold flex ">
                  Recent Shorten Url's :
                </p>
                <div className="my-6 space-y-4">
                  {myShortenUrls.map((item) => (
                    <ShortenItem key={item.id} {...item} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Modal
        open={shortenPopUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-full w-full">
          <CreateNewShorten setOpen={setShortenPopUp} refetch={refetch} />
        </div>
      </Modal>
    </div>
  );
};

export default DashboardLayout;

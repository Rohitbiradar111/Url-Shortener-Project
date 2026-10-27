import { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { MdSecurity } from "react-icons/md";
import api from "../../api/api";
import toast from "react-hot-toast";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [safetyResult, setSafetyResult] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const checkSafetyHandler = async () => {
    const url = getValues("originalUrl");
    if (!url || !url.trim()) {
      toast.error("Please enter a URL to scan");
      return;
    }
    setScanning(true);
    try {
      const { data } = await api.post(
        "/api/urls/scan-safety",
        { originalUrl: url },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setSafetyResult(data);
      if (data.safe) {
        toast.success("URL verified as safe!", { duration: 2500 });
      } else {
        toast.error(`Warning: ${data.reason}`, { duration: 4000 });
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Could not complete safety scan";
      toast.error(msg);
    } finally {
      setScanning(false);
    }
  };

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (refetch) refetch();

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`}`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "top-center",
          className: "mt-5",
          duration: 3000,
        });
      });
      reset();
      setSafetyResult(null);
      setOpen(false);
    } catch (error) {
      const message = error.response?.data?.message || "Create ShortURL Failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white rounded-md max-w-full">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="sm:w-112.5 w-90 relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >
        <h1 className="sm:mt-0 mt-3 text-center font-bold sm:text-2xl text-[22px] text-slate-800">
          Create a New Short Url
        </h1>

        <hr className="mt-2 sm:mb-4 mb-3 text-slate-950" />

        <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm rounded-md p-2.5 sm:mb-4 mb-3 flex items-center gap-2">
          <span className="font-semibold text-amber-950">Notice:</span>
          <span>Links automatically expire after <strong>5 days</strong>.</span>
        </div>

        <div>
          <TextField
            label="Enter URL :"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        {safetyResult && (
          <div
            className={`mt-3 p-3 rounded-md text-xs border ${
              safetyResult.safe
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-rose-50 border-rose-300 text-rose-900"
            }`}
          >
            <span className="font-bold">
              {safetyResult.safe ? "✓ " : "⚠ "}
            </span>
            <span>{safetyResult.reason}</span>
          </div>
        )}

        <div className="flex justify-center items-center gap-3 my-4">
          <button
            type="button"
            disabled={scanning || loading}
            onClick={checkSafetyHandler}
            className="font-semibold text-center cursor-pointer px-5 py-2 transition-colors rounded-md bg-amber-300 hover:bg-amber-400 shadow-md shadow-slate-400 text-slate-900 flex items-center gap-2 text-sm disabled:opacity-60"
          >
            <MdSecurity className="text-lg text-slate-800" />
            {scanning ? "Scanning..." : "Scan Safety with AI"}
          </button>

          <button
            disabled={loading || scanning}
            className="font-semibold text-center cursor-pointer px-6 py-2 transition-colors rounded-md bg-amber-300 hover:bg-amber-400 shadow-md shadow-slate-400 text-slate-900 text-sm disabled:opacity-60"
          >
            {loading ? "Loading..." : "Create"}
          </button>
        </div>

        {!loading && (
          <Tooltip title="Close">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <RxCross2 className="text-slate-900 text-3xl" />
            </button>
          </Tooltip>
        )}
      </form>
    </div>
  );
};

export default CreateNewShorten;

import dayjs from "dayjs";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdQrCodeScanner, MdOutlineAdsClick } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { QRCodeSVG } from "qrcode.react";
import { HiOutlineDownload } from "react-icons/hi";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [qrToggle, setQrToggle] = useState(false);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    "",
  );

  const qrcodeHandler = () => {
    setQrToggle(!qrToggle);
  };

  return (
    <div className="bg-slate-100 shadow-lg border px-6 sm:py-1 py-3 rounded-md">
      <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-5">
        <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden">
          <div className="text-slate-900 pb-1 sm:pb-0 flex items-center gap-2">
            <Link
              target="_"
              className="text-[17px] font-semibold hover:underline"
              to={
                import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`
              }
            >
              {subDomain + "/s/" + `${shortUrl}`}
            </Link>
            <FaExternalLinkAlt />
          </div>

          <div className="flex items-center gap-1">
            <h3 className=" text-slate-700 font-normal text-[17px]">
              {originalUrl}
            </h3>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div className="flex gap-1 items-center font-semibold text-green-800">
              <span>
                <MdOutlineAdsClick className="text-[22px] me-1" />
              </span>
              <span className="text-[16px]">{clickCount}</span>
              <span className="text-[15px] ">
                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
              <span>
                <FaRegCalendarAlt />
              </span>
              <span className="text-[17px]">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 sm:justify-end items-center gap-4">
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={`${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}`}
          >
            <div className="flex gap-1 items-center py-2 font-semibold px-6 rounded-md bg-amber-300 cursor-pointer shadow-md shadow-slate-500">
              <button className="cursor-pointer">
                {isCopied ? "Copied" : "Copy"}
              </button>
              {isCopied ? (
                <LiaCheckSolid className="text-md" />
              ) : (
                <IoCopy className="text-md" />
              )}
            </div>
          </CopyToClipboard>

          <div
            onClick={() => qrcodeHandler(shortUrl)}
            className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white"
          >
            <button className="cursor-pointer">QR Code</button>
            <MdQrCodeScanner className="text-md" />
          </div>
        </div>
      </div>
      <React.Fragment>
        <div
          className={`${
            qrToggle ? "flex" : "hidden"
          } flex-col items-center justify-center sm:mt-0 mt-5 py-5 border-t-2 w-full bg-white rounded-b-md transition-all`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white border-4 border-slate-200 rounded-xl shadow-sm">
              <QRCodeSVG
                id={`qr-${shortUrl}`}
                value={
                  import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + shortUrl
                }
                size={180}
                level={"H"}
                includeMargin={true}
              />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-bold text-slate-800">
                Your QR Code is Ready
              </h3>
              <p className="text-sm text-slate-500 max-w-xs">
                Scan this code to instantly access your shortened link.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default ShortenItem;

import dayjs from "dayjs";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdQrCodeScanner, MdOutlineAdsClick } from "react-icons/md";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate, expiresDate }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [qrToggle, setQrToggle] = useState(false);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    "",
  );

  const qrcodeHandler = () => {
    setQrToggle(!qrToggle);
  };

  const expiry = expiresDate
    ? dayjs(expiresDate)
    : createdDate
    ? dayjs(createdDate).add(5, "day")
    : null;
  const isExpired = expiry ? expiry.diff(dayjs()) <= 0 : false;

  const getRemainingDaysText = () => {
    if (!expiry) return "Expires in 5 days";

    const daysLeft = Math.ceil(expiry.diff(dayjs(), "day", true));
    if (daysLeft <= 0) return "Expired";
    if (daysLeft === 1) return "Expires in 1 day";
    return `Expires in ${daysLeft} days`;
  };

  return (
    <div className={`${isExpired ? "bg-slate-50 border-slate-300 opacity-80" : "bg-slate-100 border-amber-300"} shadow-lg shadow-slate-200 border-2 px-6 sm:py-1 py-3 rounded-md`}>
      <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-5">
        <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden">
          <div className="text-slate-900 pb-1 sm:pb-0 flex items-center gap-2">
            {isExpired ? (
              <span className="text-[17px] font-semibold text-slate-400 line-through cursor-not-allowed select-none">
                {subDomain + "/s/" + `${shortUrl}`}
              </span>
            ) : (
              <Link
                target="_"
                className="text-[17px] font-semibold hover:underline"
                to={
                  import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`
                }
              >
                {subDomain + "/s/" + `${shortUrl}`}
              </Link>
            )}
            {!isExpired && <FaExternalLinkAlt />}
          </div>

          <div className="flex items-center gap-1">
            <h3 className=" text-slate-700 font-normal text-[17px]">
              {originalUrl}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6">
            <div className="flex gap-1 items-center font-semibold text-green-800" title="Total clicks (analytics retained for 5 days)">
              <span>
                <MdOutlineAdsClick className="text-[22px] me-1" />
              </span>
              <span className="text-[16px]">{clickCount}</span>
              <span className="text-[16px] ">
                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-slate-800" title="URL Creation Date">
              <span>
                <FaRegCalendarAlt />
              </span>
              <span className="text-[16px]">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>

            {!isExpired && (
              <div
                className="flex items-center gap-1 font-semibold text-red-500"
                title="Auto-expires 5 days after creation"
              >
                <FaRegClock />
                <span className="text-[16px]">{getRemainingDaysText()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 sm:justify-end items-center gap-4">
          {isExpired ? (
            <div className="flex gap-1 items-center py-2 px-6 rounded-md bg-slate-200 text-slate-400 font-semibold cursor-not-allowed select-none">
              <span>Link Expired</span>
            </div>
          ) : (
            <CopyToClipboard
              onCopy={() => setIsCopied(true)}
              text={`${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}`}
            >
              <div className="flex gap-1 items-center py-2 px-6 rounded-md bg-amber-300 hover:bg-amber-400 font-semibold cursor-pointer shadow-md shadow-slate-500 text-slate-900 transition-colors">
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
          )}

          {!isExpired && (
            <div
              onClick={() => qrcodeHandler(shortUrl)}
              className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white hover:bg-rose-800 transition-colors"
            >
              <button className="cursor-pointer">QR Code</button>
              <MdQrCodeScanner className="text-md" />
            </div>
          )}
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
              <p className="text-sm text-slate-500">
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

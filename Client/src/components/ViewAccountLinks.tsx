import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import BlueButton from "./BlueButton";
import { useState } from "react";
import AllInfos from "./AllInfos";
import { useAllUserLinks, useUserLinks } from "@/store/UserStore";
import QRCode from "qrcode.react";

// Define types for clarity
interface Click {
  count: number;
  country: string;
}

interface Link {
  originalLink: string;
  shortenedLink: string;
  qrCodeUrl: string;
  clicks: Click[];
}

interface AllMyLinks {
  allLinks: Link[];
}

interface ViewAccountLinksProps {
  open: boolean;
  setOpenChange: (e: boolean) => void;
}

const ViewAccountLinks = ({ open, setOpenChange }: ViewAccountLinksProps) => {
  const {
    setOriginalLink,
    setShortenedLink,
    setQrCode,
    setQrCodeIndex,
    setClicks,
  } = useUserLinks();
  const { allMyLinks } = useAllUserLinks();

  const [modal, setModal] = useState(false);
  const [header, setHeader] = useState("");

  // Safely access allLinks with default empty array if undefined
  const links = allMyLinks?.allLinks || [];

  return (
    <>
      <Dialog open={open} onOpenChange={setOpenChange}>
        <DialogContent className="bg-[#0B101B] opacity-100 text-white shadow-2xl">
          <DialogTitle>Your Shortened Links</DialogTitle>
          <div className="mt-4">
            {links.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Original Link</th>
                    <th className="py-2 hidden lg:visible">Shortened Link</th>
                    <th className="py-2 hidden md:visible">QR Code</th>
                    <th className="py-2 hidden md:visible">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-2 flex justify-between">
                        {link.originalLink}{" "}
                        <BlueButton
                          buttonText={
                            <img src="/icons/arrow-right.svg" alt="arrow" />
                          }
                          handleClick={() => {
                            setHeader(`Shortened Link ${index + 1}`);
                            setOriginalLink(link.originalLink);
                            setShortenedLink(
                              `domain-name.com/${link.shortenedLink}`
                            );
                            setQrCode(link.qrCodeUrl);
                            setQrCodeIndex(index.toString());
                            setClicks(link.clicks);
                            setModal(true);
                          }}
                          className="px-3 py-2 rounded-full"
                          type="button"
                        />
                      </td>
                      <td className="py-2 hidden md:visible">
                        <a
                          href={link.shortenedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {link.shortenedLink}
                        </a>
                      </td>
                      <td className="py-2 px-4 hidden md:visible">
                        <QRCode
                          id={`QRCode-${index}`}
                          value={link.qrCodeUrl || ""}
                        />
                      </td>
                      <td className="py-2 px-4 hidden md:visible">
                        {link.clicks.length > 0 ? (
                          link.clicks.map((click, idx: string) => (
                            <div key={idx}>
                              <p>
                                {click.count} clicks from {click.country}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No click data available</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No shortened links available.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <AllInfos
        handleChange={(e: boolean) => setModal(e)}
        header={header}
        opens={modal}
      />
    </>
  );
};

export default ViewAccountLinks;

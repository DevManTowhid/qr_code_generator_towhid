import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        link.click();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg rounded-lg w-[90%] md:w-1/2 mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-white">QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <div ref={qrRef} className="p-6 border border-blue-400 rounded-lg bg-white shadow-lg">
          <QRCodeCanvas value={text} size={200} />
        </div>
      )}
      {text && (
        <button
          onClick={handleDownload}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;

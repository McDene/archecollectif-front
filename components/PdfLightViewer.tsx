"use client";
/* eslint-disable @next/next/no-img-element */

import React, { FC, useMemo, useState } from "react";

interface PdfLightViewerProps {
  pdfUrl: string;
}

function buildCloudinaryPageUrl(pdfUrl: string, page: number, width = 1200) {
  try {
    const u = new URL(pdfUrl);
    if (!/res\.cloudinary\.com$/i.test(u.hostname)) return null;
    const pathname = u.pathname; // e.g. /<cloud>/image/upload/v1234/path/to/file.pdf
    const uploadMarker = "/upload/";
    const idx = pathname.indexOf(uploadMarker);
    if (idx === -1) return null;
    const prefix = `${u.origin}${pathname.substring(0, idx + uploadMarker.length)}`;
    const rest = pathname.substring(idx + uploadMarker.length); // e.g. v1234/path/to/file.pdf
    const transforms = `f_auto,q_auto:eco,w_${width},dpr_auto,pg_${page}`;
    // Replace the original extension with .jpg to request image output
    const lastSlash = rest.lastIndexOf("/");
    const lastDot = rest.lastIndexOf(".");
    const restAsJpg =
      lastDot > lastSlash ? `${rest.slice(0, lastDot)}.jpg` : `${rest}.jpg`;
    const withTransforms = `${prefix}${transforms}/${restAsJpg}`;
    return withTransforms;
  } catch {
    return null;
  }
}

const PdfLightViewer: FC<PdfLightViewerProps> = ({ pdfUrl }) => {
  const isCloudinary = useMemo(
    () => /https?:\/\/res\.cloudinary\.com\//i.test(pdfUrl),
    [pdfUrl]
  );

  // Progressive discovery of page count: start with a chunk and stop when an image 404 occurs
  const [maxPages, setMaxPages] = useState(4);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [hiddenPages, setHiddenPages] = useState<Record<number, boolean>>({});

  const pages = useMemo(() => {
    const n = totalPages ?? maxPages;
    return Array.from({ length: n }, (_, i) => i + 1);
  }, [maxPages, totalPages]);

  if (!isCloudinary) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      {pages.map((p) => {
        if (hiddenPages[p]) return null;
        const src = buildCloudinaryPageUrl(pdfUrl, p) || "";
        return (
          <img
            key={p}
            src={src}
            loading={p === 1 ? "eager" : "lazy"}
            decoding="async"
            alt={`Page ${p}`}
            className="w-full h-auto rounded-md bg-gray-100"
            onError={() => {
              // Hide the broken page immediately
              setHiddenPages((h) => ({ ...h, [p]: true }));
              // If we don't yet know total pages, the first missing page indicates true total
              setTotalPages((prev) => (prev == null ? Math.max(0, p - 1) : prev));
            }}
          />
        );
      })}

      {totalPages == null && (
        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-outline btn-sm rounded-full text-myred border-myred hover:bg-myred hover:text-white"
            onClick={() => setMaxPages((n) => n + 4)}
            aria-label="Plus de page"
          >
            Plus de page
          </button>
        </div>
      )}
      {totalPages != null && pages.length < totalPages && (
        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-outline btn-sm rounded-full text-myred border-myred hover:bg-myred hover:text-white"
            onClick={() => setMaxPages((n) => Math.min(totalPages, n + 4))}
            aria-label="Plus de page"
          >
            Plus de page
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfLightViewer;

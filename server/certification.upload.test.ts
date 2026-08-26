import { beforeEach, describe, expect, it, vi } from "vitest";

const storagePut = vi.hoisted(() => vi.fn());
vi.mock("./storage", () => ({ storagePut }));

import { uploadPortfolioCertificationAttestation } from "./db";

describe("uploadPortfolioCertificationAttestation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("envoie une image PNG validée vers le stockage", async () => {
    storagePut.mockResolvedValue({ key: "attestation.png", url: "/manus-storage/attestation.png" });

    await expect(uploadPortfolioCertificationAttestation({ fileName: "attestation diplôme.png", mimeType: "image/png", dataUrl: "data:image/png;base64,ZmFrZQ==" })).resolves.toEqual({ key: "attestation.png", url: "/manus-storage/attestation.png" });
    expect(storagePut).toHaveBeenCalledWith(expect.stringContaining("portfolio/certifications/attestations/"), expect.any(Buffer), "image/png");
  });

  it("refuse les formats non image et les data URLs incohérentes", async () => {
    await expect(uploadPortfolioCertificationAttestation({ fileName: "attestation.pdf", mimeType: "application/pdf", dataUrl: "data:application/pdf;base64,ZmFrZQ==" })).rejects.toThrow("Format d’image non pris en charge");
    await expect(uploadPortfolioCertificationAttestation({ fileName: "attestation.png", mimeType: "image/png", dataUrl: "data:image/jpeg;base64,ZmFrZQ==" })).rejects.toThrow("Image d’attestation invalide");
    expect(storagePut).not.toHaveBeenCalled();
  });
});

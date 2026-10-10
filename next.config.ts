import type { NextConfig } from "next"
import { networkInterfaces } from "node:os"

const nextConfig: NextConfig = {
  // Let phones on the local network load the development client and HMR.
  // Discover addresses at startup so changing Wi-Fi doesn't require an edit.
  allowedDevOrigins: Object.values(networkInterfaces()).flatMap((interfaces) =>
    (interfaces ?? [])
      .filter((network) => network.family === "IPv4")
      .map((network) => network.address)
  ),
}

export default nextConfig

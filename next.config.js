/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io'],
  },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
 })
 module.exports =nextConfig ;
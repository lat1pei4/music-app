const defaultAssetExts =
  require("metro-config/src/defaults/defaults").assetExts;

module.exports = {
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts: [...defaultAssetExts, "mp4"], // Add 'mp4' here
  },
};

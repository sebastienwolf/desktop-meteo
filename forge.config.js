module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},

  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "sebastienwolf",
          name: "desktop-meteo",
        },
        authToken: "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",
        prerelease: false,
        draft: true,
      },
    },
  ],
};

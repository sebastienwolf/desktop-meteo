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

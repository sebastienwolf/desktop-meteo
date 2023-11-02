module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./src/assets/icone.ico",
  },
  rebuildConfig: {},

  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: "./src/assets/icone.ico",
        hideConsole: true,
      },
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

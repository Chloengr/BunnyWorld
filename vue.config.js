module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/main.scss";`
      }
    }
  },
  devServer: { https: true }
};

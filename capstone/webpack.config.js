const path = require('path');

module.exports = {
 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@static': path.resolve(__dirname, 'static/capstone'),
    },
    
    extensions: ['.js', '.jsx']
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ],
          plugins: ['@babel/plugin-transform-runtime']
      }
        },
      },
       {
        test: /\.css$/,
        use:
          [
            'style-loader',
            'css-loader',
          ]
      }
    ]
  }
};

// https://github.com/michael-ciniawsky/postcss-load-config


module.exports = {
  plugins: {
    'autoprefixer': {
    browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    // 'postcss-pxtorem': {
    // rootValue: 75,
    // propList: ['*']
    // }
    
    'postcss-pxtorem': {
      rootValue ({ file }) {
     	 // indexOf 会查找文件路径包不包含vant, 找到这个字段的索引
     	 // 找到就返回索引号 找不到就返回-1
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}


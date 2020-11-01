# react-pricing
用于对价格格式化，保留小数点，小符号，划线价格等的处理组件。

目前的代码适用于React-Native，可以根据使用的平台进行修改。

还有针对普通文本价格处理的 GPrice 函数，提供链式调用

## 用法
```javascript
import Price, { GPrice } from 'react-pricing'

<Price color="#111111" price={60000} ori={90000} format precision />

<Text style={[styles.listHeaderLabel, { paddingRight: 15 }]}>
  收入¥{GPrice(139000).format().precision().value}
</Text>
```

## 图片
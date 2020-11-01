import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import css from '../theme/css'
import colors from '../theme/colors'

interface Props {
  /** 原价格/划线价格 */
  orig?: number
  /** 展示的价格 */
  price?: number
  /** 价格颜色 */
  color?: string
  /** 价格尺寸 xlarge: 21 large: 18 | default: 15 | small: 13*/
  size?: 'large' | 'default' | 'small' | 'xlarge'
  /** 格式化 eg: 12000 -> 12,000 */
  format?: boolean
  /** 没小数点的自动精确到小数点后两位 */
  precision?: boolean
  /** 是否展示符号 */
  hideSign?: boolean
  /** 是否加粗 */
  bold?: boolean
}

const sizeMap = {
  large: {
    price: 18,
    sign: 13
  },
  xlarge: {
    price: 21,
    sign: 16
  },
  default: {
    price: 15,
    sign: 12
  },
  small: {
    price: 13,
    sign: 11
  }
}
// 针对普通文本的价格
const FPrice = class {
  price: number
  value: string
  constructor(price: number) {
    this.price = price / 100
    this.value = `${price / 100}` // 处理后返回的结果
  }
  format() {
    this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return this
  }
  precision() {
    const dotIndex = this.value.lastIndexOf('.')
    this.value =
      dotIndex !== -1 ? (this.value.split('.')[1].length === 2 ? this.value : `${this.value}0`) : `${this.value}.00`
    return this
  }
}
export const GPrice = (price: number) => {
  return new FPrice(price)
}

const Price: React.FC<Props> = (props) => {
  const {
    orig,
    color = colors.textBody,
    price = 0,
    format = true,
    size = 'default',
    precision,
    hideSign,
    bold = true
  } = props
  const createFinalPrice = () => {
    const finalPrice = GPrice(price)
    if (format) {
      finalPrice.format()
    }
    if (precision) {
      finalPrice.precision()
    }
    return finalPrice.value
  }
  return (
    <View style={styles.prices}>
      <View style={styles.newPrice}>
        <Text
          style={[
            {
              ...styles.newPriceText,
              color: color,
              fontSize: sizeMap[size].price,
              lineHeight: sizeMap[size].price + 2
            },
            bold ? css.textBold : null
          ]}>
          {hideSign ? null : <Text style={{ color, fontSize: sizeMap[size].sign }}>¥</Text>}
          {createFinalPrice()}
        </Text>
      </View>
      {orig ? (
        <View style={{ ...styles.oriPrice }}>
          <Text style={[styles.oriPriceText]}> ¥{orig / 100}</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  prices: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  newPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  newPriceText: {
    ...css.textBody1
  },
  oriPrice: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 3
  },
  oriPriceText: {
    ...css.textFootnoot,
    color: colors.textFootnote,
    lineHeight: 13,
    textDecorationLine: 'line-through'
  }
})

export default Price

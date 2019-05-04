import Taro,{ Component } from "@tarojs/taro";
import { View,Navigator,Text,Image } from "@tarojs/components";
import "./index.less";

class Index extends Component {
    //开启全局样式的设置
    static options = {
        addGlobalClass: true
    }

    constructor(props){
        super(props);
    }

    render(){
        //循环生成标签
        let shopArr = this.props.shop_arr;
        let elements = shopArr.map((v,i) => {  
            return (
                <View className="mt_shop_item" key={i}>
                    <Navigator  className="mt_shop_nav">
                        <View className="mt_shop_left">
                            <Image mode="widthFix" src={v.img_src} className="mt_shop_img"></Image>
                        </View>
                        <View className="mt_shop_right">
                            <View className="mt_shop_info_one">
                                <Text className="mt_shop_info_title">{v.brand_name}</Text>
                                <Text className="mt_shop_info_distance">{v.dis}m</Text>
                            </View>
                            <View className="mt_shop_info_two">
                                <Text className="mt_shop_info_location">{v.desc}</Text>
                            </View>
                            <View className="mt_shop_info_three">
                                <Text className="mt_shop_info_price">￥{v.price}</Text>
                                <Text className="mt_shop_info_count">已售 {v.count}</Text>
                            </View>
                            <View className="mt_shop_info_four">
                            <Text className="mt_shop_info_discount">{v.discount}</Text>
                            </View>
                        </View>
                    </Navigator>
                </View>
            )
        })

        return <View className="mt_shop">
            <View className="mt_shop_title">  
                ——  猜你喜欢  ——
            </View>
            <View className="mt_shop_content">
                {elements}
            </View>
        </View>
    }
} 
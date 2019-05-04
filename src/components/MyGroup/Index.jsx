import Taro,{ Component } from "@tarojs/taro";
import { View,Text,Navigator } from "@tarojs/components";
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
        let groupArr = this.props.group_arr;
        let elements = groupArr.map((v,i) => {  
            return (
                <Navigator className="mt_group_nav" key={i}>
                    <Image mode="widthFix" className="mt_goods_img" src={v.img_src}></Image>
                    <View className="mt_goods_title">{v.brand_name}</View>
                    <View className="mt_goods_price">
                        <Text className="new_price">￥{v.price}</Text>
                        <Text className="old_price">￥{v.old_price}</Text>
                    </View>
                </Navigator>
            )
        })

        return <View className="mt_group">
            <View className="mt_group_title">
                <Text className="mt_group_name">好货拼团</Text>
                <Text className="mt_group_all">全部></Text>
            </View>
            <View className="mt_group_content">
                {elements}
            </View>
        </View>
    }
} 
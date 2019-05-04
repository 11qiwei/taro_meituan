import Taro,{ Component } from "@tarojs/taro";
import { View,Navigator,Image } from "@tarojs/components";
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
        let AdArr = this.props.ad_arr;
        let elements = AdArr.map((v,i) => {
            return (
                <View key={i} className="mt_ad_item">
                    <Navigator className="mt_ad_nav">
                        <Image mode="widthFix" src={v.img} className="mt_ad_img"></Image>
                    </Navigator>
                </View>
            )
        })

        return <View className="mt_ad">
            {elements}
        </View>
    }
} 
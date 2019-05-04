import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
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
        return <View className="mt_location">
            <View className="location_left">
                <Text className="location_city">{this.props.city}</Text>
                <Text className="iconfont2 icon-xiangxia"></Text>
            </View>
            <View className="location_right">
                <Text className="iconfont2 icon-sousuo"></Text>
                <Input className="sousuo_input"></Input>
            </View>
        </View>
    }
} 
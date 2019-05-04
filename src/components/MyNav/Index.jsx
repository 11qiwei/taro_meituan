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
        let navArr = this.props.nav_arr;
        let elements = navArr.map((v,i) => {  
            return (
                <Navigator key={i} className="mt_nav_navigator">
                    <Text className={"iconfont icon "+v.icon}></Text>  
                    <View className="mt_nav_text">{v.text}</View>
                </Navigator>
            )
        })

        return <View className="mt_nav">
            {elements}
        </View>
    }
} 
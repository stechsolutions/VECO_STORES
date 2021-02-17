import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:1,
    },
    header:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // borderWidth:1,
        borderBottomWidth:0.5,
        borderBottomColor:'gray'
    },
    headerIcon:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center'
    },
    headerTextView:{
        flex:0.8,
        // borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold'
    },
    btn:{
        backgroundColor:'white',
        color:'#253370'
    },
    btnView:{
        justifyContent:'center',alignItems:'center'
    },
    socialBtnView:{
        flex:0.1,flexDirection:'row',justifyContent:'center',alignItems:'center'
    },
    socialBtn:{
        margin:5,
        justifyContent:'center',alignItems:'center'
    },
    icon: {
        paddingHorizontal: 10,
        flex: 0.1,
      },
      shadowedView: {
        elevation: 5, borderRadius: 20,
      }

    

});
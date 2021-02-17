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
    scrollInnerView:{
        marginHorizontal:20,
        marginVertical:10,
    },
    input:{
        fontSize:12,
        marginHorizontal:10,
    },
    item:{
        backgroundColor:'#F5F5F5'
    },
    photoIconView:{
        borderRadius:50,
        backgroundColor:'#E7C04F',
        // height:'100%'
    },
    nextBtnView:{
        flex:1,flexDirection:'row-reverse',
        marginHorizontal:20,
        marginVertical:10,
        justifyContent:'center',alignItems:"center"
    },
    btn:{
        backgroundColor:'#E7C04F',
        paddingHorizontal:40,
        paddingVertical:10,
        borderRadius:20,
    },
    btnText:{
    textTransform:'uppercase',
    fontSize:16,
    },
    orderInfoView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        margin:10,
    },
    orderName:{
        fontSize:14,
        padding:10,
    },
    orderDetails:{
        fontSize:12,
        textAlign:'center',
        width:'90%'
    },
    assignRouteView:{
        marginHorizontal:20,
        marginVertical:10,
        justifyContent:'center',alignItems:'center'
    },
    assignRouteText:{
        fontWeight:'bold',
        fontSize:16,
        width:'100%'
    },
    optView:{
        flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:"center"
    },

    selectionView:{
        flexDirection:'row',flex:1,width:"100%",
        paddingVertical:10,
    },
    radioText:{
        paddingHorizontal:10,
        fontSize:14,
    },
    cardView:{
        flex:1,flexDirection:'row',
        margin:10,
    },
    cardIcons:{
        padding:5,
    }



    

});
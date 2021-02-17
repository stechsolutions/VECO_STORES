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
    itemsView:{
        flex:0.9,
        borderWidth:1,
        borderColor:"red"
    },
    cardOuterView:{
        // borderWidth:1,
        margin:10,
    },
    itemStatusText:{
        fontSize:14,
        color:'red'
    },
    detailText:{
       textDecorationLine:'underline'
    }

    

});
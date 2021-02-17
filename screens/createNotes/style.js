import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container:{
        flex:1,
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
        flex:0.08,
        marginHorizontal:20,
        marginVertical:10,
        justifyContent:'center',alignItems:"center"
    },
    btn:{
        backgroundColor:'#E7C04F',
        borderRadius:20,
        width:'30%',
        padding:10,
        flex:1,justifyContent:'center',alignItems:'center'

    },
    btnText:{
    textTransform:'uppercase',
    fontSize:16,
    },
    twoInputView:{
        marginVertical:10,
        flex:1,flexDirection:'row',
        justifyContent:'space-evenly',alignItems:'center'
    },
    twoInput:{
        flex:0.45,
    },
    writeNotesText:{
        fontSize:16,
        fontWeight:'bold',
        padding:20,
    }
    

});
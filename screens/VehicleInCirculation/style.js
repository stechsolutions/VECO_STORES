import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth:1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  headerIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextView: {
    flex: 0.8,
    // borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: 'white',
    color: '#253370',
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapView: {
    flex: 1,
  },
  mapInnerView: {
    position: 'absolute',
    width: '100%',
    bottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    flex: 0.7,
    width: '100%',
    // backgroundColor: '#253370',
    // borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  eachVehicle:{
    width:'100%',
    margin:0,padding:0,

  }
});

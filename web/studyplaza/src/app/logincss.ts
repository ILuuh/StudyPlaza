import { StyleSheet } from "react-native";

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    padding: 5 ,
    width: "100%",
  },
  title: {
    fontSize:42,
    color: "#000",
    fontWeight: "700"
  }, 
  subtitle : {
    fontSize:16,
    color: "#9a2",
    fontWeight: "700"
  },
  header : {
    
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    
    
  },
  logo : {
    width: 100,
    height:130,
    marginTop: 10,
  },
  main :{
    marginTop: 30,
    width: "100%",    
    justifyContent: "center",
  },
  inputTexto: {
    width: "100%",
    textAlign: "left",
    fontSize:14,
    fontWeight: 600,
    color: "#000",
    
    marginTop: 15,
    zIndex: 99,
    
  },
  input:{
    padding: 5 ,
    marginTop: 3,
    width: "100%",
    height: 46,
    backgroundColor: "rgb(227, 230, 230)",
    borderColor: "#000",
    borderRadius: 12,
    borderWidth: 2, 
  },
  footer: {
    marginTop: 30,    
    marginBottom: 30,
    width: "100%",
    gap:15,
    alignItems: "center"
  
  },
  button: {
    width: "80%",
    height: 48,
    backgroundColor: "green",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    cursor: 'pointer'
  },
  buttonTexto :{
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 500,
    color: "#fff"
  }

});


export default estilo;
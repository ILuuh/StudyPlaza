import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { WebView } from 'react-native-webview';

const ChatScreen: React.FC = () => {
  // Tipando a variável como string para o HTML
  const htmlContent: string = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; height: 100vh; background-color: transparent;">
        <script> window.chtlConfig = { chatbotId: "1666361565" }; </script>
        <script async data-id="1666361565" id="chatling-embed-script" type="text/javascript" src="https://chatling.ai/js/embed.js"></script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          javaScriptEnabled={true}
          domStorageEnabled={true} // Mantém o histórico da sessão do usuário
          showsVerticalScrollIndicator={false}
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // Cor de fundo da sua tela
  },
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default ChatScreen;
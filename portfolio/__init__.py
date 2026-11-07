"""Servidor del portfolio.

- chat.py: núcleo puro. Valida la conversación y aplica los límites de uso.
- ports.py: el puerto ChatModel que el núcleo y la web usan para hablar con un modelo.
- deepseek.py: adaptador del puerto contra la API de DeepSeek.
- web.py: adaptador HTTP. Sirve la web y expone /api/chat.

server.py, en la raíz, es el único sitio donde se construyen y se conectan las piezas.
"""

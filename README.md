# ms-ra-forwarder

创建这个项目的初衷是为了能够在[阅读（legado）](https://github.com/gedoor/legado)中听“晓晓”念书。由于其中的脚本引擎不支持 WebSocket ，所以包装了一下微软 Edge 浏览器“大声朗读”的接口。

如果你的项目可以使用 WebSocket ，请直接在项目中调用原接口。具体代码可以参考 [ra/index.ts](ra/index.ts)。

## 重要更改


请参考下列部署方式。

### Docker（推荐）

需要安装 docker。

``` bash
# 拉取镜像
docker pull liyibo66/tts:latest
# 运行
docker run --name tts -d -p 3000:3000 liyibo66/tts
# or
docker run --name tts -d -p 3000:3000 -e TOKEN:自定义TOKEN liyibo66/tts

# 浏览器访问 http://localhost:3000
```

### Docker Compose

创建 `docker-compose.yml` 写入以下内容并保存。

``` yaml
version: '3'

services:
  tts:
    container_name: tts
    image: liyibo66/tts:latest
    restart: unless-stopped
    ports:
      - 3000:3000
#    environment:
      # 不需要可以不用设置环境变量
#     - TOKEN=123456
```

在 `docker-compose.yml` 目录下执行 `docker compose up -d`。

### 限制访问

如果需要防止他人滥用你的部署的服务，可以在应用的环境变量中添加 `TOKEN`，然后在请求头中添加 `Authorization: Bearer <TOKEN>`访问。

## 相关项目

- [ag2s20150909/TTS](https://github.com/ag2s20150909/TTS)：安卓版，可代替系统自带的TTS。
- [litcc/tts-server](https://github.com/litcc/tts-server)：Rust 版本。

## 其他说明

- 微软官方的 Azure TTS 服务目前拥有一定的免费额度，如果免费额度对你来说够用的话，请支持官方的服务。

- 如果只需要为固定的文本生成语音，可以使用[有声内容创作](https://speech.microsoft.com/audiocontentcreation)。它提供了更丰富的功能可以生成更自然的声音。

- 本项目使用的是 Edge 浏览器“大声朗读”和 Azure TTS 演示页面的接口，不保证后续可用性和稳定性。

- **本项目仅供学习和参考，请勿商用。**

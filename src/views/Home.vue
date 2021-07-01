<template>
  <q-page class="q-pa-md">
    <q-btn
      color="white"
      text-color="black"
      label="Connect"
      @click="createConnection"
    />
    <q-btn label="Send Message" @click="sendMessage" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import mqtt from "mqtt";

export default defineComponent({
  name: "Home",
  setup() {
    const connection = ref({
      host: "broker.emqx.io",
      port: 8083,
      endpoint: "/mqtt",
      connectTimeout: 4000, // Time out
      reconnectPeriod: 4000, // Reconnection interval
      clientId: "mqttjs_3be2c321",
      username: "emqx_test",
      password: "emqx_test",
    });

    const subscription = ref({
      topic: "topic/test",
      qos: 0,
    });

    const receiveNews = ref("");
    const qosList = ref([
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
    ]);
    const client: Ref<mqtt.MqttClient | null> = ref(null);
    const subscribeSuccess = ref(false);

    const createConnection = () => {
      const { host, port, endpoint, ...options } = connection.value;
      const connectUrl = `ws://${host}:${port}${endpoint}`;

      try {
        client.value = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }

      if (!client.value) {
        return;
      }

      client.value.on("connect", () => {
        console.log("Connection succeeded!");

        if (client.value) {
          console.log("Subscribed!");
          client.value.subscribe("topic/test");
        }
      });
      client.value.on("error", (error: any) => {
        console.log("Connection failed", error);
      });
      client.value.on("message", (topic: any, message: any) => {
        receiveNews.value = receiveNews.value.concat(message);
        console.log(`Received message ${message} from topic ${topic}`);
      });
    };

    const sendMessage = () => {
      if (client.value) {
        client.value.publish("topic/test", "hello world!");
      }
    };

    return {
      connection,
      subscription,
      receiveNews,
      qosList,
      client,
      subscribeSuccess,
      createConnection,
      sendMessage,
    };
  },
});
</script>

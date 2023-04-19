import { ScrollView, Text, View } from "react-native"

export default function QA() {
  return (
    <>
    <ScrollView>
      <View className="px-6 py-12">
        <View className="mb-6">
          <Text className="text-3xl mb-2 font-bold">¿Qué puedo hacer con Torneopalooza?</Text>

          <Text className="text-lg">
          Torneopalooza apoya tu torneo deportivo o de eSports (deportes electrónicos). Como organizador puedes gestionar fácilmente los equipos, crear un esquema de torneos, planificar el calendario y luego rellenar los resultados. Los participantes pueden seguir toda la acción a través de un sitio web público que puedes crear. Torneopalooza admite casi todos los tipos de deportes o eSports, ya sea que trabajes con equipos o con jugadores individuales. ¿No sabes si Torneopalooza admite tu deporte? ¡Crea un torneo gratuito o contáctanos!
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-3xl mb-2 font-bold">¿Necesito una cuenta para usar Torneopalooza?</Text>

          <Text className="text-lg">
          Sí, para organizar un torneo es necesario crear una cuenta: de esta manera podemos guardar el torneo y hacerlo accesible solo para ti. Al crear una cuenta solo te pediremos tu dirección de correo electrónico y podrás elegir tu propia contraseña. Los participantes en el torneo pueden seguir el torneo sin una cuenta.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-3xl mb-2 font-bold">¿Cuántas personas pueden acceder a una cuenta al mismo tiempo?</Text>

          <Text className="text-lg">
          ¡No hay límite! Puedes compartir tus credenciales de acceso con otros organizadores. También puedes trabajar con varias cuentas en el mismo torneo, añadiendo cuentas adicionales como administradores en la página de participantes. También existe la opción de compartir los enlaces de inicio de sesión con los árbitros y los equipos, para que puedan informar de las puntuaciones a través del sitio web del torneo, sin necesidad de crearse una cuenta.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-3xl mb-2 font-bold">¿Se necesita conexión a Internet para usar Torneopalooza?</Text>

          <Text className="text-lg">
          Sí, necesitas una conexión a Internet y un navegador actualizado. Puedes usar Torneopalooza en cualquier dispositivo (ordenador, portátil, tableta). La mejor opción es Google Chrome.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-3xl mb-2 font-bold">¿Puedo descargar una aplicación iOS/Android?</Text>

          <Text className="text-lg">
          ¡Sí! Cualquier torneo con un plan Pro, Clase mundial o Legendario puede publicarse en la aplicación de Torneopalooza, disponible para móviles Android e iOS. Con las prácticas notificaciones push, nadie se pierde ni un partido. Como jugador o árbitro, también es posible introducir los resultados a través de la aplicación, siempre que se inicie la sesión con el enlace de acceso único. El entorno de gestión de Torneopalooza funciona solo en el navegador y no como una aplicación. La mejor manera de hacer un calendario es en una pantalla más grande, pero el sitio web también se puede utilizar en un teléfono móvil sin ningún problema.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-3xl mb-2 font-bold">No encuentro un deporte o una función concreta. ¿Puedo informar de esto a Torneopalooza?</Text>

          <Text className="text-lg">
          ¡Claro que sí! Nos gustaría saber qué nuevas funciones te gustaría ver en Torneopalooza. Para ello puede enviarnos un email a torneopalooza@gmail.com
          </Text>
        </View>

      </View>
    </ScrollView>
    </>
  )
}

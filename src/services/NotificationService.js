// src/services/NotificationService.js
import PushNotification from 'react-native-push-notification';

class NotificationService {
  configure() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });
  }

  scheduleMealNotifications() {
    // Mengatur waktu notifikasi sesuai dengan waktu makan
    const meals = [
      { title: 'Sarapan', message: 'Waktunya sarapan!', hour: 7, minute: 0 },
      { title: 'Makan Siang', message: 'Waktunya makan siang!', hour: 12, minute: 0 },
      { title: 'Makan Malam', message: 'Waktunya makan malam!', hour: 19, minute: 0 },
    ];

    meals.forEach((meal) => {
      const now = new Date();
      const scheduleTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        meal.hour,
        meal.minute,
        0
      );

      // Jika waktu sudah lewat hari ini, jadwalkan untuk hari berikutnya
      if (scheduleTime <= now) {
        scheduleTime.setDate(scheduleTime.getDate() + 1);
      }

      PushNotification.localNotificationSchedule({
        channelId: 'meal-channel', // Buat channel di konfigurasi
        title: meal.title,
        message: meal.message,
        date: scheduleTime, // Waktu untuk notifikasi
        allowWhileIdle: true,
        repeatType: 'day', // Ulangi setiap hari
      });
    });
  }
}

export default new NotificationService();

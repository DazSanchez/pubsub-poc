import { Component } from '@angular/core';
import Amplify from '@aws-amplify/core';
import PubSub, { AWSIoTProvider } from '@aws-amplify/pubsub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pubsub-test';

  ngOnInit() {
    // Esto debería ir en main.ts
    Amplify.configure({
      Auth: {
        region: "us-west-1",
        identityPoolId: "us-west-1:d9595976-f6a8-4ab5-9c8c-64332b5e5d3c",
      },
    });

    Amplify.addPluggable(
      new AWSIoTProvider({
        aws_pubsub_region: 'us-west-1',
        aws_pubsub_endpoint:
          'wss://a986c8dp414cy-ats.iot.us-west-1.amazonaws.com/mqtt',
      })
    );

    // Esto debería ser un servicio
    PubSub.subscribe('testTopic').subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error(error),
      complete: () => console.log('Done'),
    });

  }
  
  publish() {
    PubSub.publish('testTopic', "Tests");
  }
}

import express from 'express';
import configureApp from './config/app';

const app: any = configureApp(express());

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});

## Buillding an image

```bash
docker build -t react-fe:1 .
```

## Run the image

```bash
docker run -dp 80:80 fe:1
```

## Validaing

> Goto http://localhost you should see the app running
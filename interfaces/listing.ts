export interface Camera {
    id: string;
    name: string;
    location: string;
    resolution: string;
    status: string;
    model: string;
    manufacturer: string;
    installationDate: string;
    image_url: string;
  }
  
  export const getCameras = (): Camera[] => [
    {
      id: "1",
      name: "Living Room Camera",
      location: "Living Room",
      resolution: "1080p",
      status: "Active",
      model: "XYZ Model",
      manufacturer: "ABC Inc.",
      installationDate: "2023-01-15",
      image_url: "https://as2.ftcdn.net/v2/jpg/01/99/80/21/1000_F_199802199_yWt7eyYryJPnZR68lUVqIwUobBHRfdzU.jpg",
    },
    {
      id: "2",
      name: "Backyard Camera",
      location: "Backyard",
      resolution: "720p",
      status: "Inactive",
      model: "ABC Model",
      manufacturer: "XYZ Inc.",
      installationDate: "2023-02-20",
      image_url: "https://i.imgur.com/kfDT7Kj.jpeg",
    },
    {
      id: "3",
      name: "Front Door Camera",
      location: "Front Door",
      resolution: "1080p",
      status: "Active",
      model: "PQR Model",
      manufacturer: "DEF Corp.",
      installationDate: "2022-12-10",
      image_url: "https://a57.foxnews.com/cf-images.us-east-1.prod.boltdns.net/v1/static/694940094001/4a3be2b2-c8fb-4f7a-95f2-06d8e974e384/e62be6fa-9f3f-4f7a-b9df-728395ee21bf/1280x720/match/896/500/image.jpg?ve=1&tl=1",
    }
  ];
  
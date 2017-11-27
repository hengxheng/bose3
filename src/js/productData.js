const url = "http://localhost:7080/productImages/";

export const headphones = [
        {
            name: "SoundSport® in-ear headphones",
            points: 10,
            imageUrl: url+"/Headphones/SSinear_headphone.jpg"
        },
        {
            name: "SoundSport® Wireless Headphones",
            points: 10,
            imageUrl: url+"/Headphones/SS_Wireless_HP.jpg"
        },
        {
            name: "SoundLink® Around Ear wireless headphones",
            points :20,
            imageUrl: url+"/Headphones/SL_around_ear_wireless.jpg"
        },
        {
            name: "QuietComfort® 35 wireless headphones",
            points :50,
            imageUrl: url+"/Headphones/QC35wireless.jpg"
        }
];

console.log(productsData.headphones);
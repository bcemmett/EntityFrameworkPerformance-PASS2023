namespace PizzaParadiseAdminWebsite.Server
{
    public class LocationService
    {
        public static bool IsInProximity(int miles, string zipCode1, string zipCode2)
        {
            return new Random().Next(1, 100000) == 1;
        }
    }
}
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Respository
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);

    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApps.Api.DTOs;
using DatingApps.Api.Entities;
using DatingApps.Api.Helpers;

namespace DatingApps.Api.Interfaces;

public interface IMessagesRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message> GetMessage(int id);
    Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
    Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername);
    Task<bool> SaveAllAsync();
}
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApps.Api.DTOs;
using DatingApps.Api.Entities;
using DatingApps.Api.Extensions;
using DatingApps.Api.Helpers;
using DatingApps.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApps.Api.Controllers;

[Authorize]
public class MessagesController : BaseApiController
{
    private IUserRepository _userRepository;
    private IMessagesRepository _messagesRepository;
    private IMapper _mapper;

    public MessagesController(IUserRepository userRepository, IMessagesRepository messagesRepository, IMapper mapper)
    {
        _mapper = mapper;
        _messagesRepository = messagesRepository;
        _userRepository = userRepository;
    }

    [HttpPost]
    public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
    {
        var username = User.GetUserName();
        if (username == createMessageDto.RecipientUsername.ToLower())
            return BadRequest("you can not send messages to your self");
        var sender = await _userRepository.GetUserByUsernameAsync(username);
        var recipient = await _userRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

        if (recipient == null) return NotFound();
        var message = new Message()
        {
            Sender = sender,
            Recipient = recipient,
            SenderUsername = sender.UserName,
            RecipientUsername = recipient.UserName,
            Content = createMessageDto.Content
        };
        
        _messagesRepository.AddMessage(message);

        if (await _messagesRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));
        return BadRequest("failed to send message");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageForUser([FromQuery] MessageParams messageParams)
    {
        messageParams.Username = User.GetUserName();
        var messages = await _messagesRepository.GetMessagesForUser(messageParams);
        Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
        return messages;
    }

    [HttpGet("thread/{username}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
    {
        var currentUsername = User.GetUserName();

        return Ok(await _messagesRepository.GetMessageThread(currentUsername, username));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMessage(int id)
    {
        var username = User.GetUserName();
        var message = await _messagesRepository.GetMessage(id);
        if (message.Sender.UserName != username && message.Recipient.UserName != username)
            return Unauthorized();
        if (message.Sender.UserName == username) message.SenderDeleted = true;
        if (message.Recipient.UserName == username) message.RecipientDeleted = true;
        if(message.SenderDeleted && message.RecipientDeleted) 
            _messagesRepository.DeleteMessage(message);
        if(await _messagesRepository.SaveAllAsync()) return Ok();

        return BadRequest("problem deleting message");
    }

}
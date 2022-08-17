import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { IUserResponse } from '../common/interfaces/user-response.interface';
import { IResponseMessage } from '../common/interfaces/response-message.interface';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

//Register new user
export const postCreateUser = async (
  req: Request,
  res: Response
): Promise<IUserResponse> => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req);
  console.log(firstName);
  console.log(email);

  if (!email) {
    const err: IResponseMessage = {
      error: {
        statusCode: 401,
        message: 'fields are required.',
      },
    };

    res.status(401).json(err);
    return err;
  }

  //   const findUser: CreateUserDto = await User.findOne({ username });
  const existingUser: unknown = await User.findOne({ email });

  if (existingUser) {
    const userResponse: IUserResponse = {
      error: {
        statusCode: 400,
        message: 'Username already exist, Please login.',
      },
    };
    res.status(400).json(userResponse);

    return userResponse;
  }

  if (password.length < 6) {
    const userResponse: IUserResponse = {
      error: {
        statusCode: 400,
        message: 'Password must be at least 6 characters',
      },
    };
    res.status(400).json(userResponse);

    return userResponse;
  }

  if (firstName.length <= 2) {
    const userResponse: IUserResponse = {
      error: {
        statusCode: 400,
        message: 'First name must be at least 3 characters',
      },
    };

    res.status(400).json(userResponse);
    return userResponse;
  }

  if (lastName.length <= 2) {
    const userResponse: IUserResponse = {
      error: {
        statusCode: 400,
        message: 'Last name must be at least 3 characters',
      },
    };

    res.status(400).json(userResponse);
    return userResponse;
  }

  const hashedPassword = await argon2.hash(password);

  const user = await new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = await jwt.sign(
    { userId: user._id, email },
    // process.env.TOKEN_KEY,
    'youaretoofaithfultofailme',
    {
      expiresIn: '2h',
    }
  );

  await user.save();

  res.status(201).json({ msg: user, token: token });
  const registeredUser: IUserResponse = { user: user };

  return registeredUser;
};

//Login existing user
export const postLoginUser = async (
  req: Request,
  res: Response
): Promise<IUserResponse> => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err: IResponseMessage = {
      error: {
        statusCode: 400,
        message: 'Please fill all required fields.',
      },
    };

    res.status(400).json(err);
    return err;
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const userResponse: IUserResponse = {
      error: {
        statusCode: 404,
        message: 'User not found',
      },
    };

    res.status(404).json(userResponse);
    return userResponse;
  }

  const validatePass = await argon2.verify(existingUser.password, password);

  if (!validatePass) {
    const userResponse: IUserResponse = {
      error: {
        statusCode: 400,
        message: 'Invalid login details!',
      },
    };
    res.status(400).json(userResponse);
    return userResponse;
  }

  await existingUser.save();

  const token = await jwt.sign(
    { userId: existingUser._id, email },
    // process.env.TOKEN_KEY,
    'youaretoofaithfultofailme',
    {
      expiresIn: '2h',
    }
  );

  res.status(200).json({ msg: existingUser, token: token });

  const loggedUser: IUserResponse = { user: existingUser };
  return loggedUser;
};

//Deleting a user's account from the platform. Usually we do soft deletion but since this is an assessment, I will do actual deleting
export const postDeleteUser = async (
  req: Request,
  res: Response
): Promise<string> => {
  const { user, email } = req.body;

  if (!email) {
    res.status(401).json({ error: 'Email is required.' });

    return 'Email is required';
  }

  if (!user) {
    res.status(401).json({ error: 'You are not authorized' });

    return 'You are not authorized';
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(404).json({ error: 'User not found' });

    return 'User not found';
  }

  if (String(existingUser._id) !== String(user.userId)) {
    console.log(existingUser._id);

    console.log(user.userId);
    res.status(401).json({ error: "You can't perform this operation" });

    return 'You can perform this operation';
  }

  await User.deleteOne({ email });

  res.status(200).json({ msg: 'Account deleted' });

  return 'Account deleted';
};

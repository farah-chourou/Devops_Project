const { Login } = require("../../auth/AuthentificationController");
const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");

// Mock the UserModel and bcrypt
jest.mock("../../models/UserModel");
jest.mock("bcrypt");

describe("Auth Controller Tests - Login", () => {
  test("Login with correct credentials", async () => {
    const req = {
      body: { email: "chouroufarah@gmail.com", password: "27893558" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = {
      email: "chouroufarah@gmail.com",
      password: "27893558",
    };

    // Mock UserModel.findOne to simulate finding a user
    UserModel.findOne.mockResolvedValue(mockUser);

    bcrypt.compare.mockResolvedValue(true);

    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Logged successfully",
      success: true,
      user: mockUser,
    });
  });

  test("Login with incorrect credentials", async () => {
    const req = {
      body: { email: "invalid@example.com", password: "wrongpass" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock UserModel.findOne to simulate not finding a user
    UserModel.findOne.mockResolvedValue(null);

    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please verify your email",
      success: false,
    });
  });
});

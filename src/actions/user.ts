'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser(); // Retrieve the current authenticated user.
    if (!user) {
      return { status: 403 }; // Return 403 if no user is authenticated.
    }

    // Check if the user already exists in the database.
    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id, // Match based on the Clerk user ID.
      },
      include: {
        workspace: true, // Include the associated workspace records.
      },
    });

    if (userExist) {
      // User already exists in the database.
      return { status: 200, user: userExist };
    }

    // If the user does not exist, create a new user along with a default workspace.
    const newUser = await client.user.create({
      data: {
        clerkid: user.id, // Clerk user ID.
        email: user.emailAddresses[0].emailAddress, // Primary email address.
        firstname: user.firstName, // First name from the Clerk profile.
        lastname: user.lastName, // Last name from the Clerk profile.
        image: user.imageUrl, // Profile image URL from Clerk.
        // Create a default personal workspace for the new user.
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`, // Default workspace name.
            type: 'PERSONAL', // Workspace type.
          },
        },
      },
      include: {
        workspace: true, // Include the newly created workspace in the response.
      },
    });

    if (newUser) {
      // Successfully created a new user and workspace.
      return { status: 201, user: newUser };
    }

    // Return 400 if user creation fails for any reason.
    return { status: 400 };
  } catch (error) {
    console.error('🔴 ERROR:', error);
    // Return 500 in case of unexpected errors.
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const notifications = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    })

    if (notifications?.notification?.length) {
      return { status: 200, data: notifications }
    }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 400, data: [] }
  }
}

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const users = await client.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },
          { lastname: { contains: query } },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    })

    if (users.length) {
      return { status: 200, data: users }
    }

    return { status: 404, data: undefined }
  } catch (error) {
    return { status: 500, data: undefined }
  }
}

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const payment = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: { plan: true },
        },
      },
    })

    if (payment) {
      return { status: 200, data: payment }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const view = await client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
    })

    if (view) {
      return { status: 200, data: 'Setting updated' }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const getFirstView = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const userData = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    })

    if (userData) {
      return { status: 200, data: userData.firstView }
    }
    return { status: 400, data: false }
  } catch (error) {
    return { status: 400 }
  }
}

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId?: string
) => {
  try {
    if (commentId) {
      const reply = await client.comment.create({
        data: {
          comment,
          userId,
          videoId,
          Comment: {
            connect: { id: commentId },
          },
        },
      })

      if (reply) {
        return { status: 200, data: 'Reply posted' }
      }
    } else {
      const newComment = await client.comment.create({
        data: {
          comment,
          userId,
          videoId,
        },
      })

      if (newComment) return { status: 200, data: 'New comment added' }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const getUserProfile = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const profileIdAndImage = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        image: true,
        id: true,
      },
    })

    if (profileIdAndImage) return { status: 200, data: profileIdAndImage }
  } catch (error) {
    return { status: 400 }
  }
}

export const getVideoComments = async (Id: string) => {
  try {
    const comments = await client.comment.findMany({
      where: {
        OR: [{ videoId: Id }, { commentId: Id }],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    })

    return { status: 200, data: comments }
  } catch (error) {
    return { status: 400 }
  }
}

export const acceptInvite = async (inviteId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const invitation = await client.invite.findUnique({
      where: {
        id: inviteId,
      },
      select: {
        workSpaceId: true,
        reciever: {
          select: {
            clerkid: true,
          },
        },
      },
    })

    if (user.id !== invitation?.reciever?.clerkid) return { status: 401 }

    const membersTransaction = await client.$transaction([
      client.invite.update({
        where: { id: inviteId },
        data: { accepted: true },
      }),
      client.member.create({
        data: {
          workSpaceId: invitation?.workSpaceId!,
          userId: user.id,
        },
      }),
    ])

    if (membersTransaction) {
      return { status: 200 }
    }
    return { status: 400 }
  } catch (error) {
    return { status: 400 }
  }
}

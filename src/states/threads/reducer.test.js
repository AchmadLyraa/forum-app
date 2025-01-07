/**
 * - threadsReducer function test
 *   - should return the initial state when given by unknown action
 *   - should return the threads when given by RECEIVE_THREADS action
 *   - should return the threads with the new thread when given by ADD_THREADS action
 */


import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the talks when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        'threads': [
          {
            'id': 'thread-Np47p4jhUXYhrhRn',
            'title': 'Bagaimana pengalamanmu belajar Redux?',
            'body': 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            'category': 'redux',
            'createdAt': '2023-05-29T07:55:52.266Z',
            'ownerId': 'user-mQhLzINW_w5TxxYf',
            'totalComments': 0,
            'upVotesBy': [],
            'downVotesBy': []
          },
          {
            'id': 'thread-91KocEqYPRz68MhD',
            'title': 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
            'body': '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
            'category': 'perkenalan',
            'createdAt': '2023-05-29T07:54:35.746Z',
            'ownerId': 'user-aROWej8yYA1sOfHN',
            'totalComments': 1,
            'upVotesBy': [
              'user-mQhLzINW_w5TxxYf'
            ],
            'downVotesBy': []
          }
        ]
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });
  it('should return the talks with the new talk when given by ADD_TALK action', () => {
    // arrange
    const initialState = [
      {
        'id': 'thread-1',
        'title': 'Thread Pertama',
        'body': 'Ini adalah thread pertama',
        'category': 'General',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'ownerId': 'users-1',
        'upVotesBy': [],
        'downVotesBy': [],
        'totalComments': 0
      }
    ];
    const action = {
      type: 'ADD_THREADS',
      payload: {
        thread: {
          'id': 'thread-2',
          'title': 'Thread Kedua',
          'body': 'Ini adalah thread pertama',
          'category': 'Expert',
          'createdAt': '2022-06-21T07:00:00.000Z',
          'ownerId': 'users-1',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0
        }
      }
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
});
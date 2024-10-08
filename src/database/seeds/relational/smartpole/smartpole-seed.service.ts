import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartPoleEntity } from '../../../../smartpole/infrastructure/relational/entities/smartpole.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { LocationEntity } from '../../../../location/infrastructure/relational/entities/location.entity';
import { UserEntity } from '../../../../user/infrastructure/relational/entities/user.entity';

@Injectable()
export class SmartPoleSeedService {
  constructor(
    @InjectRepository(SmartPoleEntity)
    private smartPoleRepository: Repository<SmartPoleEntity>,

    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async run() {
    type PairLocation = {
      lat1: number;
      lng1: number;
      lat2: number;
      lng2: number;
    };
    const listPairPointHcmut1: PairLocation[] = [
      {
        lat1: 10.772154517587094,
        lng1: 106.65799078417935,
        lat2: 10.773973404329478,
        lng2: 106.66141965196553,
      },
      {
        lat1: 10.772900034045186,
        lng1: 106.66057025910759,
        lat2: 10.774600991655372,
        lng2: 106.65958636895377,
      },
    ];
    const listPairPointHcmut2: PairLocation[] = [
      {
        lat1: 10.879581718567092,
        lng1: 106.80506817435548,
        lat2: 10.881214517372676,
        lng2: 106.80612433797691,
      },
      {
        lat1: 10.879514898028798,
        lng1: 106.80526521255692,
        lat2: 10.88049780898303,
        lng2: 106.8059399048784,
      },
      {
        lat1: 10.880399641876274,
        lng1: 106.80741689225768,
        lat2: 10.882045506520996,
        lng2: 106.8048302579133,
      },
      {
        lat1: 10.879452600546452,
        lng1: 106.80519804362596,
        lat2: 10.88024275291121,
        lng2: 106.80393910293876,
      },
      {
        lat1: 10.879792385828841,
        lng1: 106.80702536364485,
        lat2: 10.881080660861091,
        lng2: 106.8050095484772,
      },
      {
        lat1: 10.880621599755438,
        lng1: 106.80473344646668,
        lat2: 10.880171722814598,
        lng2: 106.80541198754605,
      },
      {
        lat1: 10.880500334787325,
        lng1: 106.80748321093425,
        lat2: 10.882131160979615,
        lng2: 106.80488639755671,
      },
      {
        lat1: 10.881781905048289,
        lng1: 106.80607683920181,
        lat2: 10.88148992441128,
        lng2: 106.8060820666026,
      },
      {
        lat1: 10.880792495983851,
        lng1: 106.80419573461363,
        lat2: 10.880351574223042,
        lng2: 106.80393217927262,
      },
      {
        lat1: 10.880666344583583,
        lng1: 106.80577049653942,
        lat2: 10.881199424655708,
        lng2: 106.80611310911006,
      },
      {
        lat1: 10.880539504022975,
        lng1: 106.80596452718419,
        lat2: 10.881074203638493,
        lng2: 106.80628303949877,
      },
      {
        lat1: 10.879034630246244,
        lng1: 106.80517898908967,
        lat2: 10.880392523424032,
        lng2: 106.80609532500617,
      },
      {
        lat1: 10.878384676799945,
        lng1: 106.80609970560249,
        lat2: 10.879010129097457,
        lng2: 106.80520511776747,
      },
    ];
    const fakerData = [
      {
        areaName: 'BK Cơ sở 1',
        areaKey: 'hcmut1',
        latitude: 10.77392998449525,
        longitude: 106.65959695077382,
        listPairPoint: listPairPointHcmut1,
      },
      {
        areaName: 'BK Cơ sở 2',
        areaKey: 'hcmut2',
        latitude: 10.880852145509786,
        longitude: 106.80538147754153,
        listPairPoint: listPairPointHcmut2,
      },
    ];

    const distancesBetweenPoles = 25;

    /**
     * Using Haversine formula to calculate the distance between two points
     */
    const calculateDistance = (pairLocation: PairLocation): number => {
      const R = 6371 * 1000; // Radius of the earth in m
      const dLat = deg2rad(pairLocation.lat2 - pairLocation.lat1); // deg2rad below
      const dLng = deg2rad(pairLocation.lng2 - pairLocation.lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(pairLocation.lat1)) *
          Math.cos(deg2rad(pairLocation.lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in m
      return Math.round(distance);
    };
    const deg2rad = (deg: number) => {
      return deg * (Math.PI / 180);
    };
    const amountOfPoles = (pairLocation: PairLocation): number => {
      return Math.floor(
        calculateDistance(pairLocation) / distancesBetweenPoles,
      );
    };

    for (const data of fakerData) {
      const location = this.locationRepository.create({
        areaKey: data.areaKey,
        areaName: data.areaName,
        latitude: data.latitude,
        longitude: data.longitude,
      });
      await this.locationRepository.save(location);
      const listPairPoint = data.listPairPoint;
      for (const pairPoint of listPairPoint) {
        const amount = amountOfPoles(pairPoint);
        for (let i = 0; i <= amount; i++) {
          const status =
            faker.number.int({ min: 0, max: 10 }) == 0 ? false : true;
          const dimming = status ? faker.number.int({ min: 0, max: 100 }) : 0;
          const voltage = faker.number.float({
            min: 210,
            max: 230,
            multipleOf: 0.01,
          });
          const current = faker.number.float({
            min: 1,
            max: 1.6,
            multipleOf: 0.01,
          });
          const smartPole = this.smartPoleRepository.create({
            latitude:
              ((amount - i) * pairPoint.lat1 + i * pairPoint.lat2) / amount,
            longitude:
              ((amount - i) * pairPoint.lng1 + i * pairPoint.lng2) / amount,
            status: status,
            dimming: dimming,
            frequency: faker.number.int({ min: 0, max: 100 }),
            burningDuration: faker.number.int({
              min: 0,
              max: 100000,
            }),
            voltage: voltage,
            current: current,
            power: parseFloat((voltage * current).toFixed(2)),
            locations: [location],
          });
          await this.smartPoleRepository.save(smartPole);
        }
      }
    }

    const user1 = {
      username: 'luong.hoang',
      password: 'password',
    };
    const userEntity = this.userRepository.create(user1);
    await this.userRepository.save(userEntity);
  }
}
